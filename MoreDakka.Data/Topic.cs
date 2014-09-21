using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoreDakka.Data
{

    [Serializable]
    public class Topic
    {
        private Guid id = Guid.NewGuid();

        [Key]
        public Guid Id
        {
            get { return id; }
            set { id = value; }
        }

        [Required]
        public Guid BoardId { get; set; }

        [Required]
        public string Name { get; set; }

        [ForeignKey("TopicId")]
        public ICollection<Post> Posts { get; set; }
    }
}
