using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Payment
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;      

    [BsonRepresentation(BsonType.ObjectId)]
    public string OrderId { get; set; } = string.Empty;  

    [Range(0, double.MaxValue)]
    public required decimal Amount { get; set; }

    public PaymentMethod Method { get; set; }

    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;

    [MaxLength(100)]
    public string TransactionId { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? PaidAt { get; set; }
}

public enum PaymentMethod
{
    Cash,
    CashOnDelivery,
    CreditCard,
    DebitCard,
    QrCode,
}

public enum PaymentStatus
{
    Pending,
    Succeeded,
    Failed,
    Refunded,
}