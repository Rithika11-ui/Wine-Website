using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var orders = await _orderService.GetAllAsync();
            var data = orders.Select(o => new OrderResponseDto
            {
                Id = o.Id,
                UserId = o.UserId,
                ProductId = o.ProductId,
                Quantity = o.Quantity,
                TotalPrice = o.TotalPrice,
                Status = o.Status,
                PaymentMethod = o.PaymentMethod,
                OrderedAt = o.OrderedAt,
                UpdatedAt = o.UpdatedAt
            }).ToList();

            return Ok(new
            {
                Success = true,
                Message = "Orders retrieved successfully.",
                Data = data
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error retrieving orders.", Error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            var order = await _orderService.GetByIdAsync(id);
            if (order is null)
                return NotFound(new { Success = false, Message = $"Order with ID {id} not found." });

            return Ok(new
            {
                Success = true,
                Message = "Order found.",
                Data = new OrderResponseDto
                {
                    Id = order.Id,
                    UserId = order.UserId,
                    ProductId = order.ProductId,
                    Quantity = order.Quantity,
                    TotalPrice = order.TotalPrice,
                    Status = order.Status,
                    PaymentMethod = order.PaymentMethod,
                    OrderedAt = order.OrderedAt,
                    UpdatedAt = order.UpdatedAt
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error retrieving order.", Error = ex.Message });
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create(CreateOrderDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided." });

            var order = new Order
            {
                UserId = dto.UserId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                TotalPrice = dto.TotalPrice,
                PaymentMethod = dto.PaymentMethod,
                Status = OrderStatus.Pending,
                OrderedAt = DateTime.UtcNow
            };

            await _orderService.CreateAsync(order);

            return CreatedAtAction(nameof(GetById), new { id = order.Id }, new
            {
                Success = true,
                Message = "Order created successfully.",
                Data = order
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error creating order.", Error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(string id, UpdateOrderDto dto)
    {
        try
        {
            var existing = await _orderService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { Success = false, Message = "Order not found for update." });

            if (dto.Status != null) existing.Status = dto.Status.Value;
            if (dto.Quantity != null) existing.Quantity = dto.Quantity.Value;
            if (dto.TotalPrice != null) existing.TotalPrice = dto.TotalPrice.Value;
            existing.UpdatedAt = DateTime.UtcNow;

            await _orderService.UpdateAsync(id, existing);

            return Ok(new { Success = true, Message = "Order updated successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error updating order.", Error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var existing = await _orderService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { Success = false, Message = "Order not found for deletion." });

            await _orderService.DeleteAsync(id);
            return Ok(new { Success = true, Message = "Order deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error deleting order.", Error = ex.Message });
        }
    }
}