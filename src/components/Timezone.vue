<!--{{{ Templates... -->
<template>
  <div class="ShowTimezone">
    <form novalidate class="md-layout" @submit.prevent="submitForm">
      <md-card class="md-layout-item">

        <md-card-header>
          <div class="md-title">City Timezones Vue Example</div>
        </md-card-header>

        <md-card-content>

          <div class="md-layout md-gutter">

            <div class="md-layout-item source-city-item md-size-100">
              <md-field :class="getValidationClass('city')">
                <label for="city">City:</label>
                <md-select name="city" id="city" placeholder="Select source city here..." v-model="form.city" :disabled="sending">
                  <md-option v-for="city in stubCities" v-bind:key="city" v-bind:value="city.toLowerCase()">
                    {{ city }}
                  </md-option>
                </md-select>
                <span class="md-error">The city is required</span>
              </md-field>
            </div>

            <div class="md-layout-item timezone-item md-size-100">
              <md-field>
                <label for="timezone">City timezone:</label>
                <md-input name="timezone" id="timezone" placeholder="Target timezone will be displayed here..." v-model="form.timezone" disabled />
              </md-field>
            </div>

          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Fetch timezone</md-button>
        </md-card-actions>

      </md-card>
      <md-snackbar :md-duration=10000 :md-active.sync="showSnackbar" md-persistent>
        <span v-html="snackbarContent" />
        <md-button class="md-accent" @click="showSnackbar = false">Dismiss</md-button>
      </md-snackbar>
    </form>
  </div>
</template>
<!--}}}-->

<!--{{{ Code... -->
<script>
  /* eslint-disable no-debugger, no-console */
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import { site as siteConfig } from '../config'
  import TimezoneLoader from '../lib/TimezoneLoader'
  const { stubCities } = siteConfig
  const timezoneLoader = new TimezoneLoader()
  const defaultCityId = null
  // DEBUG: Autoselect first city in list?
  // const defaultCityId = stubCities[0].toLowerCase()
  export default {
    name: 'ShowTimezone',
    mixins: [validationMixin],
    data: () => ({
      stubCities,
      form: {
        city: defaultCityId,
        timezone: null,
      },
      showSnackbar: false,
      snackbarContent: null,
      cityFetched: false,
      sending: false,
    }),
    validations: {
      form: {
        city: {
          required,
        },
      },
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty,
          }
        }
      },
      async fetchTimezone () {
        this.sending = true
        const { city } = this.form
        try {
          // Fetch timezone parameters
          const { id, name } = await timezoneLoader.loadTimezone({city})
          this.form.timezone = `${name} (${id})`
          this.cityFetched = true
        }
        catch(err) {
          // eslint-disable-next-line no-console
          console.error(err)
          debugger; // eslint-disable-line no-debugger
          this.snackbarContent = err
          this.showSnackbar = true
          this.cityFetched = false
        }
        finally {
          this.sending = false
        }
      },
      submitForm () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          // Get timezone if city specified
          this.fetchTimezone()
        } else {
          // Show snackbar with error text
          this.snackbarContent = 'The city parameter is required'
          this.showSnackbar = true
        }
      }
    },
  }
</script>
<!--}}}-->

<!--{{{ Styles... -->
<!-- Component styles -->
<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .md-snackbar-content {
    span {
      flex: 1;
    }
    button {
      flex-shrink: 0;
    }
  }
  .md-card-content {
    // padding-bottom: 0;
  }
  .md-disabled,
  input[disabled="disabled"] {
    opacity: .5;
  }
  .source-city-item,
  .timezone-item {
    .md-field {
      margin-bottom: 5px;
    }
  }
  .timezone-item {
    .md-field.md-disabled {
      opacity: 1;
      &.md-theme-default:after {
        background-color: transparent;
      }
      &.md-has-value {
        .md-input[disabled] {
          cursor: text;
          label,
          input {
            // pointer-events: all;
            user-select: all;
          }
        }
      }
    }
  }
</style>
<!--}}}-->
