public interface IBannerService
{
    Task<List<BannerResponseDto>> GetAllAsync();
    Task<BannerResponseDto?> GetByIdAsync(string id);
    Task<BannerResponseDto> CreateAsync(CreateBannerDto dto, string? imageUrl);
    Task<BannerResponseDto?> UpdateAsync(string id, UpdateBannerDto dto , string? imageUrl);
    Task<bool> DeleteAsync(string id);
}