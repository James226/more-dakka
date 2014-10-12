using System;
using System.ComponentModel.DataAnnotations;

namespace MoreDakka.Data
{

    [Serializable]
    public class Application
    {
        private Guid _id = Guid.NewGuid();
        private DateTime _submittedAt = DateTime.UtcNow;

        [Key]
        public Guid Id
        {
            get { return _id; }
            set { _id = value; }
        }

        [Required]
        public string Submission { get; set; }

        [Required]
        public DateTime SubmittedAt {
            get { return _submittedAt; }
            set { _submittedAt = value; }
        }

        public User User { get; set; }
    }
}