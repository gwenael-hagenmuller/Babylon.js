using System.Runtime.Serialization;

namespace BabylonExport.Entities
{
    [DataContract]
    public class BabylonVertexData : BabylonGeometry
    {
        [DataMember]
        public bool updatable { get; set; }
        
        [DataMember]
        public float[] positions { get; set; }

        [DataMember]
        public float[] normals { get; set; }

        [DataMember]
        public float[] uvs { get; set; }

        [DataMember]
        public float[] uvs2 { get; set; }

        [DataMember]
        public float[] colors { get; set; }

        [DataMember]
        public bool hasVertexAlpha { get; set; }

        [DataMember]
        public int[] matricesIndices { get; set; }

        [DataMember]
        public float[] matricesWeights { get; set; }

        [DataMember]
        public int[] indices { get; set; }
    }
}
