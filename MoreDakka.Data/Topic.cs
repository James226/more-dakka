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
    public enum TopicType
    {
        None = 0,
        Standard = 1,
        Pin = 50,
        Announcement = 100
    };

    [Serializable]
    public class Topic
    {
        private Guid _id = Guid.NewGuid();
        private DateTime _lastUpdate = DateTime.UtcNow;
        private TopicType _topicType = TopicType.Standard;

        [Key]
        public Guid Id
        {
            get { return _id; }
            set { _id = value; }
        }

        [Required]
        public Guid BoardId { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime LastUpdate
        {
            get { return _lastUpdate; }
            set { _lastUpdate = value; }
        }

        public Post LastPost { get; set; }

        public ApplicationUser User { get; set; }

        public TopicType TopicType
        {
            get { return _topicType; }
            set { _topicType = value; }
        }

        [ForeignKey("TopicId")]
        public ICollection<Post> Posts { get; set; }
    }
}
