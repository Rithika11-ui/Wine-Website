using System.ComponentModel.DataAnnotations;

public class RewardDto
{
    public string? Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Discount { get; set; } = string.Empty;
    public DiscountType DiscountType { get; set; }  // ✅ was int
    public string MinOrder { get; set; } = "0";
    public int UsageLimit { get; set; }
    public int UsedCount { get; set; }
    public RewardStatus Status { get; set; }         // ✅ was int
    public DateTime? ExpiryDate { get; set; }
}

public class CreateRewardDto
{
    [Required, MaxLength(50)]
    public string Code { get; set; } = string.Empty;

    [MaxLength(255)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string Discount { get; set; } = string.Empty;

    [Required]
    public DiscountType DiscountType { get; set; }  // ✅ was int

    public string MinOrder { get; set; } = "0";

    [Required]
    public int UsageLimit { get; set; }

    [Required]
    public RewardStatus Status { get; set; }         // ✅ was int

    public DateTime? ExpiryDate { get; set; }
}

public class UpdateRewardDto
{
    [Required, MaxLength(50)]
    public string Code { get; set; } = string.Empty;

    [MaxLength(255)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string Discount { get; set; } = string.Empty;

    [Required]
    public DiscountType DiscountType { get; set; }  // ✅ was int

    public string MinOrder { get; set; } = "0";

    [Required]
    public int UsageLimit { get; set; }

    [Required]
    public RewardStatus Status { get; set; }         // ✅ was int

    public DateTime? ExpiryDate { get; set; }
}