﻿module BABYLON.Internals {
    

    var parseBox = (parsedBox, scene) => {
        if (BABYLON.GeometriesLoader.ParseGeometry(parsedBox, scene)) {
            return null; // null since geometry could be something else than a box...
        }

        var box = new BABYLON.Geometry.Primitives.Box(parsedBox.id, scene, parsedBox.size, parsedBox.canBeRegenerated, null);
        BABYLON.Tags.AddTagsTo(box, parsedBox.tags);

        scene.pushGeometry(box, true);

        return box;
    };

    var parseSphere = (parsedSphere, scene) => {
        if (BABYLON.GeometriesLoader.ParseGeometry(parsedSphere, scene)) {
            return null; // null since geometry could be something else than a sphere...
        }

        var sphere = new BABYLON.Geometry.Primitives.Sphere(parsedSphere.id, scene, parsedSphere.segments, parsedSphere.diameter, parsedSphere.canBeRegenerated, null);
        BABYLON.Tags.AddTagsTo(sphere, parsedSphere.tags);

        scene.pushGeometry(sphere, true);

        return sphere;
    };

    var parseCylinder = (parsedCylinder, scene) => {
        if (BABYLON.GeometriesLoader.ParseGeometry(parsedCylinder, scene)) {
            return null; // null since geometry could be something else than a cylinder...
        }

        var cylinder = new BABYLON.Geometry.Primitives.Cylinder(parsedCylinder.id, scene, parsedCylinder.height, parsedCylinder.diameterTop, parsedCylinder.diameterBottom, parsedCylinder.tessellation, parsedCylinder.subdivisions, parsedCylinder.canBeRegenerated, null);
        BABYLON.Tags.AddTagsTo(cylinder, parsedCylinder.tags);

        scene.pushGeometry(cylinder, true);

        return cylinder;
    };

    var parseTorus = (parsedTorus, scene) => {
        if (BABYLON.GeometriesLoader.ParseGeometry(parsedTorus, scene)) {
            return null; // null since geometry could be something else than a torus...
        }

        var torus = new BABYLON.Geometry.Primitives.Torus(parsedTorus.id, scene, parsedTorus.diameter, parsedTorus.thickness, parsedTorus.tessellation, parsedTorus.canBeRegenerated, null);
        BABYLON.Tags.AddTagsTo(torus, parsedTorus.tags);

        scene.pushGeometry(torus, true);

        return torus;
    };

    var parseGround = (parsedGround, scene) => {
        if (BABYLON.GeometriesLoader.ParseGeometry(parsedGround, scene)) {
            return null; // null since geometry could be something else than a ground...
        }

        var ground = new BABYLON.Geometry.Primitives.Ground(parsedGround.id, scene, parsedGround.width, parsedGround.height, parsedGround.subdivisions, parsedGround.canBeRegenerated, null);
        BABYLON.Tags.AddTagsTo(ground, parsedGround.tags);

        scene.pushGeometry(ground, true);

        return ground;
    };

    var parsePlane = (parsedPlane, scene) => {
        if (BABYLON.GeometriesLoader.ParseGeometry(parsedPlane, scene)) {
            return null; // null since geometry could be something else than a plane...
        }

        var plane = new BABYLON.Geometry.Primitives.Plane(parsedPlane.id, scene, parsedPlane.size, parsedPlane.canBeRegenerated, null);
        BABYLON.Tags.AddTagsTo(plane, parsedPlane.tags);

        scene.pushGeometry(plane, true);

        return plane;
    };

    var parseTorusKnot = (parsedTorusKnot, scene) => {
        if (BABYLON.GeometriesLoader.ParseGeometry(parsedTorusKnot, scene)) {
            return null; // null since geometry could be something else than a torusKnot...
        }

        var torusKnot = new BABYLON.Geometry.Primitives.TorusKnot(parsedTorusKnot.id, scene, parsedTorusKnot.radius, parsedTorusKnot.tube, parsedTorusKnot.radialSegments, parsedTorusKnot.tubularSegments, parsedTorusKnot.p, parsedTorusKnot.q, parsedTorusKnot.canBeRegenerated, null);
        BABYLON.Tags.AddTagsTo(torusKnot, parsedTorusKnot.tags);

        scene.pushGeometry(torusKnot, true);

        return torusKnot;
    };

    var parseVertexData = (parsedVertexData, scene, rootUrl) => {
        if (BABYLON.GeometriesLoader.ParseGeometry(parsedVertexData, scene)) {
            return null; // null since geometry could be a primitive
        }

        var geometry = new BABYLON.Geometry(parsedVertexData.id, scene);

        BABYLON.Tags.AddTagsTo(geometry, parsedVertexData.tags);

        if (parsedVertexData.delayLoadingFile) {
            geometry.delayLoadState = BABYLON.Engine.DELAYLOADSTATE_NOTLOADED;
            geometry.delayLoadingFile = rootUrl + parsedVertexData.delayLoadingFile;
            geometry._boundingInfo = new BABYLON.BoundingInfo(BABYLON.Vector3.FromArray(parsedVertexData.boundingBoxMinimum), BABYLON.Vector3.FromArray(parsedVertexData.boundingBoxMaximum));

            geometry._delayInfo = [];
            if (parsedVertexData.hasUVs) {
                geometry._delayInfo.push(BABYLON.VertexBuffer.UVKind);
            }

            if (parsedVertexData.hasUVs2) {
                geometry._delayInfo.push(BABYLON.VertexBuffer.UV2Kind);
            }

            if (parsedVertexData.hasColors) {
                geometry._delayInfo.push(BABYLON.VertexBuffer.ColorKind);
            }

            if (parsedVertexData.hasMatricesIndices) {
                geometry._delayInfo.push(BABYLON.VertexBuffer.MatricesIndicesKind);
            }

            if (parsedVertexData.hasMatricesWeights) {
                geometry._delayInfo.push(BABYLON.VertexBuffer.MatricesWeightsKind);
            }

            geometry._delayLoadingFunction = importVertexData;
        } else {
            importVertexData(parsedVertexData, geometry);
        }

        scene.pushGeometry(geometry, true);

        return geometry;
    };

    var importVertexData = (parsedVertexData, geometry) => {
        var vertexData = new BABYLON.VertexData();

        // positions
        var positions = parsedVertexData.positions;
        if (positions) {
            vertexData.set(positions, BABYLON.VertexBuffer.PositionKind);
        }

        // normals
        var normals = parsedVertexData.normals;
        if (normals) {
            vertexData.set(normals, BABYLON.VertexBuffer.NormalKind);
        }

        // uvs
        var uvs = parsedVertexData.uvs;
        if (uvs) {
            vertexData.set(uvs, BABYLON.VertexBuffer.UVKind);
        }

        // uv2s
        var uv2s = parsedVertexData.uv2s;
        if (uv2s) {
            vertexData.set(uv2s, BABYLON.VertexBuffer.UV2Kind);
        }

        // colors
        var colors = parsedVertexData.colors;
        if (colors) {
            vertexData.set(colors, BABYLON.VertexBuffer.ColorKind);
        }

        // matricesIndices
        var matricesIndices = parsedVertexData.matricesIndices;
        if (matricesIndices) {
            vertexData.set(matricesIndices, BABYLON.VertexBuffer.MatricesIndicesKind);
        }

        // matricesWeights
        var matricesWeights = parsedVertexData.matricesWeights;
        if (matricesWeights) {
            vertexData.set(matricesWeights, BABYLON.VertexBuffer.MatricesWeightsKind);
        }

        // indices
        var indices = parsedVertexData.indices;
        if (indices) {
            vertexData.indices = indices;
        }

        geometry.setAllVerticesData(vertexData, parsedVertexData.updatable);
    };

    BABYLON.GeometriesLoader.RegisterPlugin({
        name: "default",
        importGeometries: (geometries: any, scene: Scene, rootUrl: string): boolean => {
            if (!geometries) {
                return true; // nothing to import so import succeeded...
            }

            var index: number;

            // Boxes
            var boxes = geometries.boxes;
            if (boxes) {
                for (index = 0; index < boxes.length; index++) {
                    var parsedBox = boxes[index];
                    parseBox(parsedBox, scene);
                }
            }

            // Spheres
            var spheres = geometries.spheres;
            if (spheres) {
                for (index = 0; index < spheres.length; index++) {
                    var parsedSphere = spheres[index];
                    parseSphere(parsedSphere, scene);
                }
            }

            // Cylinders
            var cylinders = geometries.cylinders;
            if (cylinders) {
                for (index = 0; index < cylinders.length; index++) {
                    var parsedCylinder = cylinders[index];
                    parseCylinder(parsedCylinder, scene);
                }
            }

            // Toruses
            var toruses = geometries.toruses;
            if (toruses) {
                for (index = 0; index < toruses.length; index++) {
                    var parsedTorus = toruses[index];
                    parseTorus(parsedTorus, scene);
                }
            }

            // Grounds
            var grounds = geometries.grounds;
            if (grounds) {
                for (index = 0; index < grounds.length; index++) {
                    var parsedGround = grounds[index];
                    parseGround(parsedGround, scene);
                }
            }

            // Planes
            var planes = geometries.planes;
            if (planes) {
                for (index = 0; index < planes.length; index++) {
                    var parsedPlane = planes[index];
                    parsePlane(parsedPlane, scene);
                }
            }

            // TorusKnots
            var torusKnots = geometries.torusKnots;
            if (torusKnots) {
                for (index = 0; index < torusKnots.length; index++) {
                    var parsedTorusKnot = torusKnots[index];
                    parseTorusKnot(parsedTorusKnot, scene);
                }
            }

            // VertexData
            var vertexData = geometries.vertexData;
            if (vertexData) {
                for (index = 0; index < vertexData.length; index++) {
                    var parsedVertexData = vertexData[index];
                    parseVertexData(parsedVertexData, scene, rootUrl);
                }
            }

            return true;
        }
    });
}