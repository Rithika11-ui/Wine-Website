using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProductAsync()
    {
        try
        {
            var products = await _productService.GetAllProductAsync();
            var response = products.Select(p => new ProductResponseDto
            {
                Id = p.Id,
                Name = p.Name,
                Volume = p.Volume,
                Alcohol = p.Alcohol,
                Description = p.Description,
                Price = p.Price,
                Rating = p.Rating,
                CategoryId = p.CategoryId,
                Image = p.Image,
                CreatedAt = p.CreatedAt,
            });

            return Ok(new
            {
                Success = true,
                Message = "Products retrieved successfully.",
                Data = response
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error retrieving products.", Error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(string id)
    {
        try
        {
            var product = await _productService.GetByIdAsync(id);
            if (product is null)
                return NotFound(new { Success = false, Message = $"Product with ID {id} not found." });

            return Ok(new
            {
                Success = true,
                Message = "Product found.",
                Data = new ProductResponseDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Volume = product.Volume,
                    Alcohol = product.Alcohol,
                    Description = product.Description,
                    Price = product.Price,
                    Rating = product.Rating,
                    CategoryId = product.CategoryId,
                    Image = product.Image,
                    CreatedAt = product.CreatedAt,
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error retrieving product.", Error = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateProduct(CreateProductDto productDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data provided." });

            var product = new Product
            {
                Name = productDto.Name,
                Volume = productDto.Volume,
                Alcohol = productDto.Alcohol,
                Description = productDto.Description,
                Price = productDto.Price,
                CategoryId = productDto.CategoryId,
                Image = productDto.Image,
                CreatedAt = DateTime.UtcNow,
            };

            await _productService.CreateProductAsync(product);

            return Ok( new
            {
                Success = true,
                Message = "Product created successfully.",
                Data = new ProductResponseDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Volume = product.Volume,
                    Alcohol = product.Alcohol,
                    Description = product.Description,
                    Price = product.Price,
                    Rating = product.Rating,
                    CategoryId = product.CategoryId,
                    Image = product.Image,
                    CreatedAt = product.CreatedAt,
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error creating product.", Error = ex.Message });
        }
    }

    [HttpPatch("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateProductAsync(string id, UpdateProductDto updateProductDto)
    {
        try
        {
            var existing = await _productService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { Success = false, Message = $"Product with ID {id} not found." });

            if (updateProductDto.Name != null) existing.Name = updateProductDto.Name;
            if (updateProductDto.Alcohol != null) existing.Alcohol = updateProductDto.Alcohol.Value;
            if (updateProductDto.Volume != null) existing.Volume = updateProductDto.Volume.Value;
            if (updateProductDto.Price != null) existing.Price = updateProductDto.Price.Value;
            if (updateProductDto.Description != null) existing.Description = updateProductDto.Description;
            if (updateProductDto.Image != null) existing.Image = updateProductDto.Image;

            await _productService.UpdateProductAsync(id, existing);

            return Ok(new
            {
                Success = true,
                Message = "Product updated successfully.",
                Data = new ProductResponseDto
                {
                    Id = existing.Id,
                    Name = existing.Name,
                    Volume = existing.Volume,
                    Alcohol = existing.Alcohol,
                    Description = existing.Description,
                    Price = existing.Price,
                    Rating = existing.Rating,
                    CategoryId = existing.CategoryId,
                    Image = existing.Image,
                    CreatedAt = existing.CreatedAt,
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error updating product.", Error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteProductAsync(string id)
    {
        try
        {
            var existing = await _productService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { Success = false, Message = $"Product with ID {id} not found." });

            await _productService.DeleteProductAsync(id);

            return Ok(new
            {
                Success = true,
                Message = "Product deleted successfully."
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error deleting product.", Error = ex.Message });
        }
    }
}