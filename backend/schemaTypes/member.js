// Dette er schema-definisjonen for medlemmer i Sanity
// Den definerer strukturen for medlemsdata i databasen
export default {
  name: 'member', // Internt navn for schema (brukes i GROQ-spørringer)
  title: 'Gruppemedlem', // Visningsnavn i Sanity Studio
  type: 'document', // Type dokument (hovedinnholdstype i Sanity)
  fields: [
    // Fornavn - påkrevd felt
    {
      name: 'firstName',
      title: 'Fornavn',
      type: 'string',
      validation: Rule => Rule.required() // Påkrevd felt
    },
    // Etternavn - påkrevd felt
    {
      name: 'lastName',
      title: 'Etternavn',
      type: 'string',
      validation: Rule => Rule.required() // Påkrevd felt
    },
    // E-post - påkrevd felt med e-post-validering
    {
      name: 'email',
      title: 'E-post',
      type: 'string',
      validation: Rule => Rule.required().email() // Må være gyldig e-post
    },
    // Profilbilde - valgfritt felt
    {
      name: 'image',
      title: 'Profilbilde',
      type: 'image',
      options: {
        hotspot: true // Tillater å velge fokuspunkt for bildet
      }
    },
    // Biografi - valgfritt tekstfelt
    {
      name: 'biography',
      title: 'Biografi',
      type: 'text'
    },
    // Interesser - array av strenger
    {
      name: 'interests',
      title: 'Interesser',
      type: 'array',
      of: [{ type: 'string' }]
    },
    // Loggføringer - array av objekter
    {
      name: 'logs',
      title: 'Loggføringer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            // Beskrivelse av oppgaven - påkrevd
            {
              name: 'description',
              title: 'Beskrivelse',
              type: 'string',
              validation: Rule => Rule.required()
            },
            // Dato for loggføringen - påkrevd
            {
              name: 'date',
              title: 'Dato',
              type: 'date',
              validation: Rule => Rule.required()
            },
            // Antall timer brukt - valgfritt tallfelt
            {
              name: 'hours',
              title: 'Timer',
              type: 'number'
            }
          ]
        }
      ]
    }
  ]
}