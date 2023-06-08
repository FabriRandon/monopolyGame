class GameConstants {
    static DINERO_INICIAL = 600;
    static SQUARE_INICIAL = 0;
    static DADOS_MIN_VALOR = 2;
    static DADOS_MAX_VALOR = 12; 
    static TURNO_INICIAL = 0;
    static MPOPTIONS = {
        MOVER_MAPA: "movemap",
        CONSTRUIR_CASA: "buildhouse",
        HIPOTECAR_CASA: "mortgagehouse",
        HIPOTECAR_POSESION: "mortgagepossession",
        DESHIPOTECAR_POSESION: "unmortgagepossession",
        TERMINAR_TURNO: "endturn"
    }
}
module.exports = GameConstants;