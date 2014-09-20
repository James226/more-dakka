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
    public class Board
    {
        private Guid id = Guid.NewGuid();

        [Key]
        public Guid Id
        {
            get { return id; }
            set { id = value; }
        }

        [Required]
        public string Name { get; set; }

        [ForeignKey("BoardId")]
        public ICollection<Topic> Topics
        {
            get;
            set;
        }
    }

    public class BoardContext : DbContext
    {
        public BoardContext()
            : base("MoreDakkaEntities")
        {
            Database.SetInitializer<BoardContext>(new CreateDatabaseIfNotExists<BoardContext>());
        }

        public IDbSet<Board> Boards { get; set; }
        public IDbSet<Topic> Topics { get; set; }
        public IDbSet<Post> Posts { get; set; }
    }
}