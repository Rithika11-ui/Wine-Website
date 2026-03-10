using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]         
    public async Task<IActionResult> GetAll()
    {
        var payments = await _paymentService.GetAllAsync();
        var response = payments.Select(p => new PaymentResponseDto
        {
            Id = p.Id,
            OrderId = p.OrderId,
            Amount = p.Amount,
            Method = p.Method,
            Status = p.Status,
            TransactionId = p.TransactionId,
            CreatedAt = p.CreatedAt,
            PaidAt = p.PaidAt
        });
        return Ok(response);
    }

    [HttpGet("{id}")]
    [Authorize]                         
    public async Task<IActionResult> GetById(string id)
    {
        var payment = await _paymentService.GetByIdAsync(id);
        if (payment is null) return NotFound();

        return Ok(new PaymentResponseDto
        {
            Id = payment.Id,
            OrderId = payment.OrderId,
            Amount = payment.Amount,
            Method = payment.Method,
            Status = payment.Status,
            TransactionId = payment.TransactionId,
            CreatedAt = payment.CreatedAt,
            PaidAt = payment.PaidAt
        });
    }

    [HttpPost]
    [Authorize]                            
    public async Task<IActionResult> Create(CreatePaymentDto dto)
    {
        var payment = new Payment          
        {
            OrderId = dto.OrderId,
            Amount = dto.Amount,
            Method = dto.Method,
            Status = PaymentStatus.Pending, 
            CreatedAt = DateTime.UtcNow     
        };

        await _paymentService.CreateAsync(payment);
        return CreatedAtAction(nameof(GetById), new { id = payment.Id }, payment);
    }

    [HttpPut("{id}/status")]               
    [Authorize(Roles = "Admin")]          
    public async Task<IActionResult> UpdateStatus(string id, [FromBody] PaymentStatus status)
    {
        var existing = await _paymentService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _paymentService.UpdateStatusAsync(id, status);
        return NoContent();
    }

}