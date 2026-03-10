using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var categories = await _categoryService.GetAllAsync();
            var data = categories.Select(c => new CategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Region = c.Region
            }).ToList();

            // foreach (var category in categories)
            // {
            //     await _categoryService.CreateAsync(category);
            // }

            return Ok(new
            {
                Success = true,
                Message = "Categories retrieved successfully.",
                Data = data
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error retrieving categories.", Error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            var category = await _categoryService.GetByIdAsync(id);
            if (category is null)
                return NotFound(new { Success = false, Message = $"Category with ID {id} not found." });

            var data = new CategoryResponseDto
            {
                Id = category.Id,
                Name = category.Name,
                Region = category.Region
            };

            return Ok(new { Success = true, Message = "Category found.", Data = data });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error retrieving category.", Error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Success = false, Message = "Invalid data." });

            var category = new Category         
            {
                Name = dto.Name,
                Region = dto.Region
            };

            await _categoryService.CreateAsync(category); // ✅ Create one

            return CreatedAtAction(nameof(GetById), new { id = category.Id }, new
            {
                Success = true,
                Message = "Category created successfully!",
                Data = category
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error creating category.", Error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(string id, UpdateCategoryDto dto)
    {
        try
        {
            var existing = await _categoryService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { Success = false, Message = "Category not found for update." });

            if (dto.Name != null) existing.Name = dto.Name;
            if (dto.Region != null) existing.Region = dto.Region;

            await _categoryService.UpdateAsync(id, existing);

            return Ok(new { Success = true, Message = "Category updated successfully.", Data = existing });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error updating category.", Error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    // [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var existing = await _categoryService.GetByIdAsync(id);
            if (existing is null)
                return NotFound(new { Success = false, Message = "Category not found for deletion." });

            await _categoryService.DeleteAsync(id);
            return Ok(new { Success = true, Message = "Category deleted successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Success = false, Message = "Error deleting category.", Error = ex.Message });
        }
    }
}