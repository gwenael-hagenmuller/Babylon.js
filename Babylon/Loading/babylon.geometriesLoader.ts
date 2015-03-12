module BABYLON {
    export interface IGeometriesLoaderPlugin {
        id: string;
        newOrDefaultInstance: () => IGeometriesLoaderPlugin;
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

        public importGeometries(geometries: any, rootUrl: string): boolean {
            var result = true;

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