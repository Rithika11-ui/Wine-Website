using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/banner")]
public class BannerController : ControllerBase
{
    private readonly IBannerService _bannerService;
    private readonly IWebHostEnvironment _env;

    public BannerController(IBannerService bannerService, IWebHostEnvironment env)
    {
        _bannerService = bannerService;
        _env = env;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var banners = await _bannerService.GetAllAsync();
        return Ok(banners);
    }

    [HttpGet("{id}")]

    public async Task<IActionResult> GetById(string id)
    {
        var banner = await _bannerService.GetByIdAsync(id);

        if (banner is null)
            return NotFound(new { message = $"Banner with id {id} not found" });

        return Ok(banner);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromForm] CreateBannerDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var imageUrl = await SaveImageAsync(dto.Image);
        // var mobileImageUrl = await SaveImageAsync(dto.MobileImage);

        if (imageUrl is null)
            return BadRequest(new { message = "Banner image is required" });

        var banner = await _bannerService.CreateAsync(dto, imageUrl);

        return CreatedAtAction(nameof(GetById), new { id = banner.Id }, banner);
    }

    [HttpPatch("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(string id, [FromForm] UpdateBannerDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var imageUrl = await SaveImageAsync(dto.Image);
        // var mobileImageUrl = await SaveImageAsync(dto.MobileImage);

        var updated = await _bannerService.UpdateAsync(id, dto, imageUrl);

        if (updated is null)
            return NotFound(new { message = $"Banner with id {id} not found" });
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _bannerService.DeleteAsync(id);

        if (!deleted)
            return NotFound(new { message = $"Banner with id {id} not found" });

        return Ok(new { message = "Banner deleted successfully" });
    }

    private async Task<string?> SaveImageAsync(IFormFile? file)
    {
        if (file is null || file.Length == 0) return null;

        var allowedTypes = new[] { "image/jpeg", "image/png", "image/webp" };
        if (!allowedTypes.Contains(file.ContentType))
            return null;

        if (file.Length > 5 * 1024 * 1024)
            return null;

        var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "banners");
        Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return $"/uploads/banners/{fileName}";
    }
}