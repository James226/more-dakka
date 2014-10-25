using System;
using System.ComponentModel.DataAnnotations;

namespace MoreDakka.Data
{
    public enum ApplicationStatus
    {
        Accepted,
        Undecided,
        Declined
    }

    [Serializable]
    public class Application
    {
        private Guid _id = Guid.NewGuid();
        private DateTime _submittedAt = DateTime.UtcNow;
        private ApplicationStatus _status = ApplicationStatus.Undecided;

        [Key]
        public Guid Id
        {
            get { return _id; }
            set { _id = value; }
        }

        [Required]
        public string Submission { get; set; }

        [Required]
        public ApplicationStatus Status
        {
            get { return _status; }
            set { _status = value; }
        }
        [Required]
        public DateTime SubmittedAt {
            get { return _submittedAt; }
            set { _submittedAt = value; }
        }

        public ApplicationUser User { get; set; }
    }
}