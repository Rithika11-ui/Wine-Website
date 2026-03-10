public interface ICategoryService
{
    Task<List<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(string id);
    Task CreateAsync(Category category);
    Task UpdateAsync(string id, Category category);
    Task DeleteAsync(string id);
}