public interface IPaymentService
{
    Task<List<Payment>> GetAllAsync();
    Task<Payment?> GetByIdAsync(string id);
    Task CreateAsync(Payment payment);
    Task UpdateStatusAsync(string id, PaymentStatus status);
}