import browserEnv from 'browser-env';
import jQuery from 'jquery';

browserEnv();
global.jQuery = jQuery(window);
