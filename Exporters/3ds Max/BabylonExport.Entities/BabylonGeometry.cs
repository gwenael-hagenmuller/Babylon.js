using System.Runtime.Serialization;

namespace BabylonExport.Entities
{
    [DataContract]
    public class BabylonGeometry
    {
        [DataMember]
        public string id { get; set; }
    }
}
