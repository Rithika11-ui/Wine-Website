using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Order
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; } = string.Empty;    

    [BsonRepresentation(BsonType.ObjectId)]
    public string ProductId { get; set; } = string.Empty; 

    [Range(1, int.MaxValue)]
    public required int Quantity { get; set; }

    [Range(0, double.MaxValue)]
    public required decimal TotalPrice { get; set; }

    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public DateTime OrderedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }
    public PaymentMethod PaymentMethod { get; set; }
}

public enum OrderStatus
{
    Pending,
    Confirmed,  
    Shipped,
    Delivered,
    Cancelled,
}