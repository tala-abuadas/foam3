/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.native',
  name: 'BlockingMethod',
  extends: 'foam.core.Method',
  properties: [
    {
      class: 'String',
      name: 'property',
      required: true
    },
    {
      name: 'javaCode',
      getter: function() {
        return `
maybeWaitFor${this.property}();
${this.javaType != 'void' ? 'return ' : ''}get${foam.String.capitalize(this.property)}()
  .${this.name}(${this.args.map(a => a.name).join(', ')});
        `;
      }
    },
    {
      name: 'swiftCode',
      getter: function() {
        return `
maybeWaitFor${this.property}()
${this.swiftType != 'void' ? 'return ' : ''}${this.swiftThrows ? 'try ' : ''}self.${this.property}!
  .${this.name}(${this.swiftArgs.map(a => a.localName).join(', ')});
        `;
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.native',
  name: 'BlockingWaitMethod',
  extends: 'foam.core.Method',
  properties: [
    {
      class: 'String',
      name: 'property'
    },
    {
      name: 'name',
      getter: function() {
        return `maybeWaitFor${this.property}`;
      }
    },
    {
      name: 'javaCode',
      flags: ['java'],
      expression: function(property) {
        return `
try {
  if ( ! isPropertySet("${property}") )
    get${foam.String.capitalize(property)}Sem().acquire();
  else
    get${foam.String.capitalize(property)}Sem().release(
      get${foam.String.capitalize(property)}Sem().getQueueLength());
} catch (Exception e) {
  throw new RuntimeException(e);
}
        `;
      }
    },
    {
      name: 'swiftCode',
      flags: ['swift'],
      expression: function(property) {
        return `
if ( !hasOwnProperty("${property}") ) {
  ${property}Sem.wait();
} else {
  while ${property}Sem.signal() > 0 {}
}
        `;
      }
    }
  ],
});

foam.CLASS({
  package: 'foam.native',
  name: 'Blocking',
  extends: 'FObjectProperty',
  requires: [
    'foam.native.BlockingMethod',
    'foam.native.BlockingWaitMethod'
  ],
  properties: [
    {
      name: 'methods',
      preSet: function(_, n) {
        return n.map(m => foam.String.isInstance(m) ?
          this.of.getAxiomByName(m) :
          m);
      },
      expression: function(of) {
        return this.of.getOwnAxiomsByClass(foam.core.Method);
      }
    },
    {
      name: 'javaPostSet',
      expression: function(name) {
        return `maybeWaitFor${name}();`;
      }
    },
    {
      name: 'swiftPostSet',
      expression: function(name) {
        return `maybeWaitFor${name}()`;
      }
    }
  ],
  methods: [
    function installInClass(cls) {
      this.SUPER(cls);
      var axioms = this.methods.map(function(m) {
        return this.BlockingMethod.create({
          name: m.name,
          property: this.name
        });
      }.bind(this));
      axioms.push(this.BlockingWaitMethod.create({
        property: this.name
      }));
      axioms.push(foam.core.Property.create({
        name: `${this.name}Sem`,

        swiftType: 'DispatchSemaphore',
        swiftFactory: 'return DispatchSemaphore(value: 0)',

        javaType: 'java.util.concurrent.Semaphore',
        javaInfoType: 'foam.core.AbstractObjectPropertyInfo',
        javaFactory: 'return new java.util.concurrent.Semaphore(0);'
      }));
      cls.installAxioms(axioms);
    }
  ]
});