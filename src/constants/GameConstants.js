class GameConstants {
    static DINERO_INICIAL = 600; //Sugerencia: 600
    static SQUARE_INICIAL = 0;
    static DADOS_MIN_VALOR = 0; //Sugerencia: 2
    static DADOS_MAX_VALOR = 0; //Sugerencia: 12
    static TURNO_INICIAL = 0;

    static NIVEL_MAX_ESTRUCTURA = 5;

    static FACTOR_HIPOTECA = 0.5
    static FACTOR_DESHIPOTECA = 0.6
    static PRECIOS_CONSTRUIR = {
        B1: {MENORA: 120, PRECIO: 50},
        B2: {MENORA: 200, PRECIO: 100},
        B3: {MENORA: 280, PRECIO: 150},
        B4: {MENORA: 400, PRECIO: 200},
        DEFAULT: {PRECIO: 250}
    }

    static TIPOS_SQUARE = {
        PROPERTY: "Property",
        RAILROAD: "Railroad",
        POSSESSION: "Possession",
        SQUARE: "Square"
    }
    static MPOPTIONS = {
        MOVER_MAPA: "movemap",
        CONSTRUIR_CASA: "buildhouse",
        HIPOTECAR_CASA: "mortgagehouse",
        HIPOTECAR_POSESION: "mortgagepossession",
        DESHIPOTECAR_POSESION: "unmortgagepossession",
        TERMINAR_TURNO: "endturn"
    }
    static MCOPTIONS = {
        COMPRAR: "buy",
        NOCOMPRAR: "nobuy"
    }
    static SECCIONES = {
        MENU_PRINCIPAL: "MP",
        MENU_ACCION_CONSTRUIR_CASA: "MAbuildhouse",
        MENU_ACCION_HIPOTECAR_CASA: "MAmortgagehouse",
        MENU_ACCION_HIPOTECAR_POSESION: "MAmortgagepossession",
        MENU_ACCION_DESHIPOTECAR_POSESION: "MAunmortgagepossession",
        MENU_COMPRAR_APROPIABLE: "MC"
    }
    static PRECIO_DEFAULT = 100;
    static BASE_ALQUILER_DEFAULT = 5;
    static NIVEL_ESTRUCTURA_DEFAULT = 0;
    static COLOR_DEFAULT = "undefined";
    static NOMBRE_DEFAULT = "unnamed";
}
module.exports = GameConstants;