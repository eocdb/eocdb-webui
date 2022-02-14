import Keycloak from "keycloak-js";

const keycloak = Keycloak ({
    url: "https://kc.brockmann-consult.de/auth",
    realm: "OCDB",
    clientId: "ocdb-login",
});

export default keycloak;
