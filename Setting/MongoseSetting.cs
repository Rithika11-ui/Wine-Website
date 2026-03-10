using System.ComponentModel.DataAnnotations;

public class MongoDbSettings
{
    [Required]
    public string ConnectionString { get; set; } = string.Empty;

    [Required]
    public string DatabaseName { get; set; } = string.Empty;
}