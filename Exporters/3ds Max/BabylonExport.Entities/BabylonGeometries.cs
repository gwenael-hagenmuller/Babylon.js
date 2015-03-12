using System.Collections.Generic;
using System.Runtime.Serialization;

namespace BabylonExport.Entities
{
    [DataContract]
    public class BabylonGeometries
    {
        [DataMember]
        public BabylonVertexData[] vertexData { get; set; }

        public List<BabylonVertexData> VertexDataList { get; private set; }

        public BabylonGeometries()
        {
            VertexDataList = new List<BabylonVertexData>();
        }
    }
}
