using System.ComponentModel.DataAnnotations;

namespace MoreDakka.Data
{
    public class Page
    {
        [Key]
        public string Name { get; set; }

        public string Body { get; set; }
    }
}
