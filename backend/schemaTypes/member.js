export default {
    name: 'member',
    title: 'Gruppemedlem',
    type: 'document',
    fields: [
      {
        name: 'firstName',
        title: 'Fornavn',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'lastName',
        title: 'Etternavn',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'email',
        title: 'E-post',
        type: 'string',
        validation: Rule => Rule.required().email()
      },
      {
        name: 'image',
        title: 'Profilbilde',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'biography',
        title: 'Biografi',
        type: 'text'
      },
      {
        name: 'interests',
        title: 'Interesser',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'logs',
        title: 'Loggføringer',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'description',
                title: 'Beskrivelse',
                type: 'string',
                validation: Rule => Rule.required()
              },
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