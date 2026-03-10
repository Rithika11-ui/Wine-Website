using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Banner
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public string Title { get; set; } = string.Empty;
    public string? Subtitle { get; set; }
    public string? Description { get; set; }

    public string ImageUrl { get; set; } = string.Empty;
    // public string? MobileImageUrl { get; set; }

    public string? ButtonText { get; set; }
    public string? ButtonLink { get; set; }

    public string Position { get; set; } = "Home";     

    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsActive { get; set; } = true;

    public int SortOrder { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}