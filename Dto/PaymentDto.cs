using System.ComponentModel.DataAnnotations;

public class CreatePaymentDto
{
    [Required]
    public required string OrderId { get; set; }

    [Range(0, double.MaxValue)]
    public required decimal Amount { get; set; }

    public PaymentMethod Method { get; set; }
}

// No UpdatePaymentDto — only status can change
// Pass PaymentStatus directly in controller
public class PaymentResponseDto
{
    public string Id { get; set; } = string.Empty;
    public string OrderId { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public PaymentMethod Method { get; set; }
    public PaymentStatus Status { get; set; }
    public string? TransactionId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? PaidAt { get; set; }
}