var BABYLON;
(function (BABYLON) {
    var GeometriesLoader = (function () {
        function GeometriesLoader(scene) {
            this._scene = scene;

            this._sceneRegisteredPlugins = {};
            for (var pluginId in GeometriesLoader._registeredPlugins) {
                this._sceneRegisteredPlugins[pluginId] = GeometriesLoader._registeredPlugins[pluginId].newOrDefaultInstance();
            }

            this._scene._geometriesLoader = this;
        }
        GeometriesLoader._getPluginForGeometries = function (pluginId, scene) {
            return scene ? scene._geometriesLoader._sceneRegisteredPlugins[pluginId] : GeometriesLoader._registeredPlugins[pluginId];
        };

        GeometriesLoader.RegisterPlugin = function (plugin) {
            var p = GeometriesLoader._getPluginForGeometries(plugin.id);
            if (p) {
                throw new Error("The plugin '" + plugin.id + "' has already been registered.");
            }
            GeometriesLoader._registeredPlugins[plugin.id] = plugin;
        };

        GeometriesLoader.prototype.importGeometryById = function (geometryId, geometries, rootUrl) {
            var geometry;

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
        };

        GeometriesLoader.prototype.importGeometries = function (geometries, rootUrl) {
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
        };

        GeometriesLoader._prepareGeometries = function (geometries) {
            if (!geometries) {
                return;
            }

            // prepare data for default geometries loader
            var defaultGeometries;
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
        };

        GeometriesLoader.ParseGeometry = function (parsedGeometry, scene) {
            var id = parsedGeometry.id;
            return scene.getGeometryByID(id);
        };

        Object.defineProperty(GeometriesLoader.prototype, "scene", {
            get: function () {
                return this._scene;
            },
            enumerable: true,
            configurable: true
        });

        GeometriesLoader.prototype.dispose = function () {
            for (var pluginId in this._sceneRegisteredPlugins) {
                this._sceneRegisteredPlugins[pluginId].dispose();
            }
            this._sceneRegisteredPlugins = {};
            this._scene._geometriesLoader = undefined;
            this._scene = undefined;
        };
        GeometriesLoader._registeredPlugins = {};
        return GeometriesLoader;
    })();
    BABYLON.GeometriesLoader = GeometriesLoader;
    ;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=babylon.geometriesLoader.js.map
