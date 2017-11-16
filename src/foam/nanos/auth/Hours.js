/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'Hours',

  documentation: 'Represents open and closing time',

  constants: [
    {
      name: 'SUNDAY',

    }
  ],

  properties: [
    {
      class: 'Enum',
      of: 'foam.nanos.auth.DayOfWeek',
      name: 'day'
    },
    {
      class: 'Boolean',
      name: 'open'
    },
    {
      class: 'Date',
      name: 'startTime'
    },
    {
      class: 'Date',
      name: 'endTime'
    }
  ]
});
