var BABYLON;
(function (BABYLON) {
    var GeometriesLoader = (function () {
        function GeometriesLoader() {
        }
        GeometriesLoader._getPluginForGeometries = function (pluginName) {
            return this._registeredPlugins[pluginName];
        };

        // Public functions
        GeometriesLoader.RegisterPlugin = function (plugin) {
            var p = GeometriesLoader._getPluginForGeometries(plugin.name);
            if (p) {
                throw new Error("The plugin '" + plugin.name + "' has already been registered.");
            }
            GeometriesLoader._registeredPlugins[plugin.name] = plugin;
        };

        GeometriesLoader.ImportGeometries = function (geometries, scene, rootUrl) {
            var result = true;

            for (var geometriesLoaderPluginName in geometries) {
                var geometriesForPlugin = geometries[geometriesLoaderPluginName];

                var plugin = this._getPluginForGeometries(geometriesLoaderPluginName);

                if (!plugin) {
                    return false;
                }

                result = plugin.importGeometries(geometriesForPlugin, scene, rootUrl) && result;
            }

            return result;
        };

        GeometriesLoader.ParseGeometry = function (parsedGeometry, scene) {
            var id = parsedGeometry.id;
            return scene.getGeometryByID(id);
        };
        GeometriesLoader._registeredPlugins = {};
        return GeometriesLoader;
    })();
    BABYLON.GeometriesLoader = GeometriesLoader;
    ;
})(BABYLON || (BABYLON = {}));
//# sourceMappingURL=babylon.geometriesLoader.js.map
