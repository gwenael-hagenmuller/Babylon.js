module BABYLON {
    export interface IGeometriesLoaderPlugin {
        name: string;
        importGeometries: (geometries: any, scene: Scene, rootUrl: string) => boolean;
    }

    export class GeometriesLoader {
        // Members
        private static _registeredPlugins: { [name: string] : IGeometriesLoaderPlugin; } = { };

        private static _getPluginForGeometries(pluginName): IGeometriesLoaderPlugin {
            return this._registeredPlugins[pluginName];
        }

        // Public functions
        public static RegisterPlugin(plugin: IGeometriesLoaderPlugin): void {
            var p = GeometriesLoader._getPluginForGeometries(plugin.name);
            if (p) {
                throw new Error("The plugin '" + plugin.name + "' has already been registered.");
            }
            GeometriesLoader._registeredPlugins[plugin.name] = plugin;
        }

        public static ImportGeometries(geometries: any, scene: Scene, rootUrl: string): boolean {
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
        }

        public static ParseGeometry(parsedGeometry: any, scene: Scene): BABYLON.Geometry {
            var id = parsedGeometry.id;
            return scene.getGeometryByID(id);
        }
    };
}