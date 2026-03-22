using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Reward
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public string Code { get; set; } = string.Empty;

    [MaxLength(255)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string Discount { get; set; } = string.Empty;

    [Required]
    public DiscountType DiscountType { get; set; }

    public string MinOrder { get; set; } = "0";

    [Required]
    public int UsageLimit { get; set; }

    public int UsedCount { get; set; } = 0;

    [Required]
    public RewardStatus Status { get; set; }

    public DateTime? ExpiryDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum DiscountType
{
    Percentage,   
    Fixed,        
}

public enum RewardStatus
{
    Active,       
    Inactive,     
    Expired,      
}