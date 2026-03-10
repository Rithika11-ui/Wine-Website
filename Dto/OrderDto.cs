using System.ComponentModel.DataAnnotations;

public class CreateOrderDto
{
    [Required(ErrorMessage = "UserId is required.")]
    public string UserId { get; set; } = string.Empty;

    [Required(ErrorMessage = "ProductId is required.")]
    public string ProductId { get; set; } = string.Empty;

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
    public int Quantity { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "TotalPrice must be non-negative.")]
    public decimal TotalPrice { get; set; }

    [Required(ErrorMessage = "PaymentMethod is required.")]
    public PaymentMethod PaymentMethod { get; set; }

}

public class UpdateOrderDto
{
    public OrderStatus? Status { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
    public int? Quantity { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "TotalPrice must non-negative.")]
    public decimal? TotalPrice { get; set; }
}

public class OrderResponseDto
{
    public string Id { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string ProductId { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
    public OrderStatus Status { get; set; }
    public PaymentMethod PaymentMethod { get; set; }
    public DateTime? OrderedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}