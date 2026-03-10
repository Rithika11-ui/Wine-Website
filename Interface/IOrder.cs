public interface IOrderService
{
    Task<List<Order>> GetAllAsync();
    Task<Order?> GetByIdAsync(string id);
    Task CreateAsync(Order order);
    Task UpdateAsync(string id, Order order);
    Task DeleteAsync(string id);
}