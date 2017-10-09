import { Bootstrap } from '../core/bootstrapper';
import { App } from './app';
import { Window } from '../core/window';
declare var bootstrap: Bootstrap<App>;

bootstrap = new Bootstrap<App>();

bootstrap.bootstrap(App);
