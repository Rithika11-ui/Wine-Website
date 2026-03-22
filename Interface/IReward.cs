public interface IRewardService
{
    Task<List<RewardDto>> GetAllAsync();
    Task<RewardDto?> GetByIdAsync(string id);
    Task<RewardDto> CreateAsync(CreateRewardDto dto);
    Task<RewardDto?> UpdateAsync(string id, UpdateRewardDto dto);
    Task DeleteAsync(string id);
}