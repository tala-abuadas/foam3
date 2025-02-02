/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

foam.CLASS({
  package: 'foam.u2',
  name: 'ActionView',
  extends: 'foam.u2.Element',

  documentation: `
    A button View for triggering Actions.

    Icon Fonts
    If using icon-fonts a css stylesheet link to the fonts is required in index.html.
    The default of foam.core.Action.js is 'Material Icons' supported by the following
    link: <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
  `,

  requires: [
    'foam.u2.ButtonSize',
    'foam.u2.ButtonStyle',
    'foam.u2.dialog.Popup',
    'foam.u2.tag.CircleIndicator',
    'foam.net.HTTPRequest',
    'foam.u2.HTMLView'
  ],

  imports: ['theme?'],

  css: `
    ^ {
      font-family: /*%FONT1%*/ Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
      border-radius: 4px;
      text-align: center;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      outline: none;
      border: 1px solid transparent;
      box-sizing: border-box;
    }

    ^ + ^ {
      margin-left: 8px;
    }

    ^:hover:not(:disabled) {
      cursor: pointer;
    }

    ^unavailable {
      display: none;
    }

    ^ img {
      vertical-align: middle;
    }

    ^ svg {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }

    ^.material-icons {
      cursor: pointer;
    }
    
    ^ > .foam-u2-HTMLView{
      padding: 0;
    }

    /* Unstyled */
    ^unstyled {
      background-color: none;
      border: none;
      color: inherit;
    }

    /* Primary */
    ^primary, ^primary svg {
      background-color: /*%PRIMARY3%*/ #406dea;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
      color: /*%WHITE%*/ white;
      fill: /*%WHITE%*/ white;
    }

    ^primary:hover:not(:disabled) {
      background-color: /*%PRIMARY2%*/ #144794;
    }

    ^primary:focus:hover {
      border-color: /*%PRIMARY1%*/ #202341;
    }

    ^primary:disabled {
      background-color: /*%PRIMARY4%*/ #C6D2FF;
    }

    /* Primary destructive */

    ^primary-destructive,^primary-destructive svg {
      background-color: /*%DESTRUCTIVE3%*/ #d9170e;
      color: /*%WHITE%*/ white;
      fill: /*%WHITE%*/ white;
    }

    ^primary-destructive:hover:not(:disabled) {
      background-color: /*%DESTRUCTIVE2%*/ #a61414;
    }

    ^primary-destructive:focus {
      border: 1px solid /*%DESTRUCTIVE1%*/ #631414;
      box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.06);
    }

    ^primary-destructive:disabled {
      background-color: /*%DESTRUCTIVE5%*/ #E5D2D0;
    }


    /* Secondary */

    ^secondary{
      background-color: /*%WHITE%*/ white;
      border: 1px solid /*%GREY3%*/ #B2B6BD;
      color: /*%GREY1%*/ #494F59;
    }

    ^secondary svg { fill: /*%GREY1%*/ #494F59; } 

    ^secondary:hover:not(:disabled) {
      background-color: /*%GREY5%*/ #B2B6BD;
    }

    ^secondary:focus {
      border: 1px solid /*%PRIMARY3%*/ #406DEA;
    }

    ^secondary:disabled{
      background-color: /*%GREY5%*/ #F5F7FA;
      border-color: /*%GREY4%*/ #DADDE2;
      color: /*%GREY4%*/ #DADDE2;
    }

    ^secondary:disabled svg { fill: /*%GREY4%*/ #DADDE2; }

    /* Secondary destructive */

    ^secondary-destructive{
      background-color: white;
      border: 1px solid /*%GREY3%*/ #B2B6BD;
      color: /*%DESTRUCTIVE2%*/ #d9170e;
    }

    ^secondary-destructive svg { fill: /*%DESTRUCTIVE2%*/ #d9170e; }

    ^secondary-destructive:hover {
      background-color: /*%GREY5%*/ #B2B6BD;
    }

    ^secondary-destructive:focus {
      border-color: /*%DESTRUCTIVE2%*/ #a61414;
    }

    ^secondary-destructive:disabled {
      background-color: /*%GREY5%*/ #F5F7FA;
      border-color: /*%GREY4%*/ #DADDE2;
      color: /*%DESTRUCTIVE5%*/ #E5D2D0;
    }

    ^secondary-destructive:disabled svg { fill: /*%DESTRUCTIVE5%*/ #E5D2D0; }

    /* Tertiary */

    ^tertiary,^tertiary svg{ 
      background: none;
      border: 1px solid transparent;
      color: /*%GREY1%*/ #5E6061;
      fill: /*%GREY1%*/ #5E6061;
    }

    ^tertiary:hover:not(:disabled) {
      background-color: /*%GREY5%*/ #F5F7FA;
    }

    ^tertiary:focus,^tertiary:focus svg {
      background-color: /*%GREY5%*/ #F5F7FA;
      color: /*%PRIMARY3%*/ #494F59;
      fill: /*%PRIMARY3%*/ #494F59;
    }

    ^tertiary:disabled,^tertiary:disabled svg {
      color: /*%GREY4%*/ #DADDE2;
      fill: /*%GREY4%*/ #DADDE2;
    }


    /* Tertiary destructive */

    ^tertiary-destructive,^tertiary-destructive svg {
      background-color: transparent;
      border-color: transparent;
      color: /*%DESTRUCTIVE5%*/ #5E6061;
      fill: /*%DESTRUCTIVE5%*/ #5E6061;
    }

    ^tertiary-destructive:hover:not(:disabled) {
      background-color: /*%GREY5%*/ #F5F7FA;
    }

    ^tertiary-destructive:focus,^tertiary-destructive:focus svg {
      background-color: /*%GREY5%*/ #F5F7FA;
      color: /*%DESTRUCTIVE3%*/ #494F59;
      fill: /*%DESTRUCTIVE3%*/ #494F59;
    }

    ^tertiary-destructive:disabled,^tertiary-destructive:diabled svg {
      color: /*%GREY4%*/ #DADDE2;
      fill: /*%GREY4%*/ #DADDE2;
    }

    /* Link */

    ^link,^link svg {
      background: none;
      color: /*%GREY1%*/ #5E6061;
      fill: /*%GREY1%*/ #5E6061;
    }

    ^link:hover,^link:hover svg {
      text-decoration: underline;
      color: /*%GREY2%*/ #6B778C;
      fill: /*%GREY2%*/ #6B778C;
    }

    ^link:focus,^link:focus svg {
      color: /*%PRIMARY3%*/ #406DEA;
      fill: /*%PRIMARY3%*/ #406DEA;
    }

    /* Sizes */

    ^small {
      padding: 6px 10px;
    }

    ^medium {
      padding: 8px 12px;
    }

    ^large {
      padding: 12px 12px;
    }

    ^iconOnly{
      padding: 8px !important;
    }

    ^link^small,
    ^link^medium,
    ^link^large {
      padding-left: 0;
      padding-right: 0;
    }

  `,

  imports: [
    'ctrl'
  ],

  enums: [
    {
      name: 'ButtonState',
      values: [
        { name: 'NO_CONFIRM' }, // No confirmation required, fire on click
        { name: 'CONFIRM' },    // Confirmation required, debounce on click
        { name: 'DEBOUNCE' },   // Move to Armed after delay, NOP on click
        { name: 'ARMED' }       // Waiting for confirmation, fire on click
      ]
    }
  ],

  messages: [
    { name: 'CONFIRM', message: 'Confirm' }
  ],

  properties: [
    {
      class: 'URL',
      name: 'icon',
      factory: function(action) { return this.action.icon; }
    },
    {
      class: 'GlyphProperty',
      name: 'themeIcon',
      factory: function(action) { return this.action.themeIcon; }
    },
    {
      class: 'String',
      name: 'iconFontFamily',
      factory: function(action) { return this.action.iconFontFamily; }
    },
    {
      class: 'String',
      name: 'iconFontClass',
      factory: function(action) { return this.action.iconFontClass; }
    },
    {
      class: 'String',
      name: 'iconFontName',
      factory: function(action) { return this.action.iconFontName; }
    },
    {
      class: 'String',
      name: 'labelPlaceholder',
      expression: function(label) { return this.action.label; }
    },
    {
      name: 'buttonState',
      factory: function() { return this.ButtonState.NO_CONFIRM; }
    },
    {
      name: 'data',
      postSet: function() {
        // Reset state
        this.buttonState = undefined;
      }
    },
    'action',
    [ 'nodeName', 'button' ],
    {
      name: 'label',
      factory: function(action) { return this.action.label; }
    },
    {
      class: 'Enum',
      of: 'foam.u2.ButtonStyle',
      name: 'buttonStyle',
      factory: function(action) { return this.action.buttonStyle || 'SECONDARY'; }
    },
    {
      class: 'Boolean',
      name: 'isDestructive',
      documentation: `
        When set to true, this action should be styled in a way that indicates
        that data is deleted in some way.
      `,
      factory: function() {
        return false;
      }
    },
    {
      class: 'Enum',
      of: 'foam.u2.ButtonSize',
      name: 'size',
      value: 'MEDIUM'
    },
    {
      class: 'String',
      name: 'styleClass_',
      expression: function(isDestructive, buttonStyle) {
        var s = buttonStyle.name.toLowerCase();
        return isDestructive ? s + '-destructive' : s;
      }
    }
  ],

  methods: [
    function initE() {
      this.tooltip = this.action.toolTip;

      this.SUPER();

      this.initCls();

      this.on('click', this.click);

      this.addContent();

      if ( this.action ) {
        if ( this.action.confirmationRequired ) {
          var cRSlot$ = this.action.createConfirmationRequired$(this.__context__, this.data);
          this.onDetach(cRSlot$.sub(() => this.setConfirm(cRSlot$.get())));
          this.setConfirm(cRSlot$.get());
        }
        this.attrs({name: this.action.name, 'aria-label': this.action.ariaLabel });

        this.enableClass(this.myClass('unavailable'), this.action.createIsAvailable$(this.__context__, this.data), true);
        this.attrs({ disabled: this.action.createIsEnabled$(this.__context__, this.data).map((e) => e ? false : 'disabled') });

        this.addClass(this.slot(function(styleClass_) {
          return this.myClass(styleClass_);
        }));
        this.addClass(this.myClass(this.size.label.toLowerCase()));
        this.enableClass(this.myClass('iconOnly'), ! this.label);
      }
    },

    function initCls() {
      this.addClass(this.myClass());
      this.addClass(this.myClass(this.action.name));
    },

    async function addContent() {
      /** Add text or icon to button. **/
      var self = this;
      var size = this.buttonStyle == this.buttonStyle.LINK ? '1em' : this.size.iconSize;
      var iconStyle = { width: size, height: size, 'margin-right': this.label ? '4px' : '' }; 
      
      if ( this.themeIcon ) {
        var indicator = this.themeIcon.clone(this).expandSVG();
        this.start(this.HTMLView, { data: indicator }).attrs({ role: 'presentation' }).style(iconStyle).end();
      } else if ( this.icon ) {
        if ( this.icon.endsWith('.svg') ) {
          var req  = this.HTTPRequest.create({
            method: 'GET',
            path: this.icon
          });
          await req.send().then(function(payload) {
            return payload.resp.text();
          }).then(x => {
            self.start(this.HTMLView, { data: x }).attrs({ role: 'presentation' }).style(iconStyle).end();
          });
        } else {
          this.start('img').style(iconStyle).attrs({ src: this.icon$, role: 'presentation' }).end();
        }
      } else if ( this.iconFontName ) {
        this.nodeName = 'i';
        this.cssClass(this.action.name);
        this.cssClass(this.iconFontClass); // required by font package
        this.style(iconStyle)
        this.attr(role, 'presentation')
        this.style({ 'font-family': this.iconFontFamily });
        this.add(this.iconFontName);
      }

      if ( this.label ) {
        if ( this.buttonStyle == 'LINK' || this.buttonStyle == 'UNSTYLED' ) {
          this.start().addClass('p').add(this.label$).end();
        } else {
          this.start().addClass('h600').add(this.label$).end();
        }
      }
    }
  ],

  listeners: [
    function click(e) {
      try {
        if ( this.action && this.action.confirmationView && this.buttonState == this.ButtonState.NO_CONFIRM ) {
          this.ctrl.add(this.Popup.create().tag(this.action.confirmationView, {
            action: this.action,
            data: this.data
          }));
        } else if ( this.buttonState == this.ButtonState.NO_CONFIRM ) {
          this.action && this.action.maybeCall(this.__subContext__, this.data);
        } else if ( this.buttonState == this.ButtonState.CONFIRM ) {
          this.buttonState = this.ButtonState.DEBOUNCE;
          this.removeAllChildren();
          this.start().addClass('h600').add(this.CONFIRM).end();
          this.debounce();
        } else if ( this.buttonState == this.ButtonState.ARMED ) {
          this.buttonState = this.ButtonState.CONFIRM;
          this.removeAllChildren();
          this.addContent();
          this.action && this.action.maybeCall(this.__subContext__, this.data);
        }
      } catch (x) {
        console.warn('Unexpected Exception in Action: ', x);
      }

      e.preventDefault();
      e.stopPropagation();
    },
    {
      name: 'debounce',
      isMerged: true,
      mergeDelay: 200,
      code: function() {
        if ( this.buttonState != this.ButtonState.DEBOUNCE ) return;

        this.buttonState = this.ButtonState.ARMED;
        this.deactivateConfirm();
      }
    },
    {
      name: 'deactivateConfirm',
      isMerged: true,
      mergeDelay: 6000,
      code: function() {
        if ( this.buttonState != this.ButtonState.ARMED ) return;
        this.removeAllChildren();
        this.addContent();
        this.buttonState = this.ButtonState.CONFIRM;
      }
    },
    {
      name: 'setConfirm',
      code: function(confirm) {
        let newState = confirm ? this.ButtonState.CONFIRM : this.ButtonState.NO_CONFIRM;
        let stateChange = this.buttonState != newState;
        this.buttonState = newState;
        this.isDestructive = confirm;
        if ( stateChange ) {
          this.removeAllChildren();
          this.addContent();
        }
      }
    }
  ]
});
