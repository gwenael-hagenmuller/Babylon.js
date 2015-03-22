module BABYLON {
    export interface IGeometriesLoaderPlugin {
        id: string;
        newOrDefaultInstance: () => IGeometriesLoaderPlugin;
        importGeometryById: (geometryId: number, geometries: any, scene: Scene, rootUrl: string) => Geometry;
        importGeometries: (geometries: any, scene: Scene, rootUrl: string) => boolean;
        dispose: () => void;
    }

    export class GeometriesLoader {
        private static _registeredPlugins: { [name: string]: IGeometriesLoaderPlugin; } = { };

        private static _getPluginForGeometries(pluginId, scene?: Scene): IGeometriesLoaderPlugin {
            return scene ? scene._geometriesLoader._sceneRegisteredPlugins[pluginId] : GeometriesLoader._registeredPlugins[pluginId];
        }

        public static RegisterPlugin(plugin: IGeometriesLoaderPlugin): void {
            var p = GeometriesLoader._getPluginForGeometries(plugin.id);
            if (p) {
                throw new Error("The plugin '" + plugin.id + "' has already been registered.");
            }
            GeometriesLoader._registeredPlugins[plugin.id] = plugin;
        }

        public importGeometryById(geometryId: number, geometries: any, rootUrl: string): Geometry {
            var geometry: Geometry;

            GeometriesLoader._prepareGeometries(geometries);

            for (var geometriesLoaderPluginId in geometries) {
                var plugin = GeometriesLoader._getPluginForGeometries(geometriesLoaderPluginId, this.scene);

                if (!plugin) {
                    continue;
                }

                var geometriesForPlugin = geometries[geometriesLoaderPluginId];

                geometry = plugin.importGeometryById(geometryId, geometriesForPlugin, this.scene, rootUrl);
            }

            return geometry;
        }

        public importGeometries(geometries: any, rootUrl: string): boolean {
            var result = true;

            GeometriesLoader._prepareGeometries(geometries);

            for (var geometriesLoaderPluginId in geometries) {
                var plugin = GeometriesLoader._getPluginForGeometries(geometriesLoaderPluginId, this.scene);

                if (!plugin) {
                    result = false;
                    continue;
                }

                var geometriesForPlugin = geometries[geometriesLoaderPluginId];

                result = plugin.importGeometries(geometriesForPlugin, this.scene, rootUrl) && result;
            }

            return result;
        }

        public static _prepareGeometries(geometries) {

            if (!geometries) {
                return;
            }

            // prepare data for default geometries loader
            var defaultGeometries: any;
            defaultGeometries = geometries["default"] = geometries["default"] || {};

            // Boxes
            if (geometries.boxes) {
                defaultGeometries.boxes = geometries.boxes;
                delete geometries.boxes;
            }

            // Spheres
            if (geometries.spheres) {
                defaultGeometries.spheres = geometries.spheres;
                delete geometries.spheres;
            }

            // Cylinders
            if (geometries.cylinders) {
                defaultGeometries.cylinders = geometries.cylinders;
                delete geometries.cylinders;
            }

            // Toruses
            if (geometries.toruses) {
                defaultGeometries.toruses = geometries.toruses;
                delete geometries.toruses;
            }

            // Grounds
            if (geometries.grounds) {
                defaultGeometries.grounds = geometries.grounds;
                delete geometries.grounds;
            }

            // Planes
            if (geometries.planes) {
                defaultGeometries.planes = geometries.planes;
                delete geometries.planes;
            }

            // TorusKnots
            if (geometries.torusKnots) {
                defaultGeometries.torusKnots = geometries.torusKnots;
                delete geometries.torusKnots;
            }

            // VertexData
            if (geometries.vertexData) {
                defaultGeometries.vertexData = geometries.vertexData;
                delete geometries.vertexData;
            }
        }

        public static ParseGeometry(parsedGeometry: any, scene: Scene): BABYLON.Geometry {
            var id = parsedGeometry.id;
            return scene.getGeometryByID(id);
        }

        public constructor(scene: Scene) {
            this._scene = scene;

            this._sceneRegisteredPlugins = {};
            for (var pluginId in GeometriesLoader._registeredPlugins) {
                this._sceneRegisteredPlugins[pluginId] = GeometriesLoader._registeredPlugins[pluginId].newOrDefaultInstance();
            }

            this._scene._geometriesLoader = this;
        }

        private _scene: Scene;
        private _sceneRegisteredPlugins: { [name: string]: IGeometriesLoaderPlugin; };

        public get scene(): Scene {
            return this._scene;
        }

        public dispose(): void {
            for (var pluginId in this._sceneRegisteredPlugins) {
                this._sceneRegisteredPlugins[pluginId].dispose();
            }
            this._sceneRegisteredPlugins = {};
            this._scene._geometriesLoader = undefined;
            this._scene = undefined;
        }
    };
}