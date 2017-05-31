import { NgModule, Component, ViewChild, ViewContainerRef, OnInit, Compiler, Type, ComponentFactory } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Member } from './classess/member';

@Component({
    selector: 'familytree',
    template: `
        <template #container></template>
    `
})
export class FamilyTree implements OnInit {
    @ViewChild('container', { read: ViewContainerRef }) viewContainer;

    constructor(private compiler: Compiler) { }

    ngOnInit() {

    }

    private createComponentFactory(componentType: Type<Member>): Promise<ComponentFactory<Member>> {
        let runtimeModule = this.createDynamicModule(componentType);

        // compile module
        return this.compiler
            .compileModuleAndAllComponentsAsync(runtimeModule)
            // All factories available in this module are returned instead of just the one we are interested in.
            // We filter the array to just get the factory for this componentType.
            .then(moduleWithFactories =>
                moduleWithFactories.componentFactories.find(fact => fact.componentType === componentType));
    }

    // for example to define its template dynamically.
    private createDynamicModule(componentType: Type<Member>): Type<RuntimeComponentModule> {
        @NgModule({
            declarations: [
                componentType
            ],
            imports: [BrowserModule]
        })
        class RuntimeComponentModule {
        }
        // a module for just this Type
        return RuntimeComponentModule;
    }
}