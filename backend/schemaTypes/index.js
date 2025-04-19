// Importerer alle schema-definisjoner
import member from './member'

// Eksporterer en array med alle schema-typer
// Dette brukes i sanity.config.js for å registrere schemaene
export const schemaTypes = [member]