
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export default {
  install: (app, pluginConfig) => {
    app.config.globalProperties.$CookieConsent = CookieConsent;
    app.config.globalProperties.$CookieConsent.run(pluginConfig);
  }
}