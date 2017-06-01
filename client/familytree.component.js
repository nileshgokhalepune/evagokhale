"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var FamilyTree = (function () {
    function FamilyTree(compiler) {
        this.compiler = compiler;
    }
    FamilyTree.prototype.ngOnInit = function () {
    };
    FamilyTree.prototype.createComponentFactory = function (componentType) {
        var runtimeModule = this.createDynamicModule(componentType);
        return this.compiler
            .compileModuleAndAllComponentsAsync(runtimeModule)
            .then(function (moduleWithFactories) {
            return moduleWithFactories.componentFactories.find(function (fact) { return fact.componentType === componentType; });
        });
    };
    FamilyTree.prototype.createDynamicModule = function (componentType) {
        var RuntimeComponentModule = (function () {
            function RuntimeComponentModule() {
            }
            return RuntimeComponentModule;
        }());
        RuntimeComponentModule = __decorate([
            core_1.NgModule({
                declarations: [
                    componentType
                ],
                imports: [platform_browser_1.BrowserModule]
            })
        ], RuntimeComponentModule);
        return RuntimeComponentModule;
    };
    return FamilyTree;
}());
__decorate([
    core_1.ViewChild('container', { read: core_1.ViewContainerRef }),
    __metadata("design:type", Object)
], FamilyTree.prototype, "viewContainer");
FamilyTree = __decorate([
    core_1.Component({
        selector: 'familytree',
        template: "\n        <template #container></template>\n    "
    }),
    __metadata("design:paramtypes", [core_1.Compiler])
], FamilyTree);
exports.FamilyTree = FamilyTree;
