
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

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('city')">
                <label for="city">City:</label>
                <md-select name="city" id="city" placeholder="Select source city here..." v-model="form.city" :disabled="sending">
                  <md-option value="moscow">Moscow</md-option>
                  <md-option value="new york">New York</md-option>
                </md-select>
                <span class="md-error">The city is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 timezone-item">
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
      <md-snackbar :md-duration=5000 :md-active.sync="showSnackbar" md-persistent>
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
  export default {
    name: 'ShowTimezone',
    mixins: [validationMixin],
    data: () => ({
      form: {
        city: null,
        timezone: null,
      },
      showSnackbar: false,
      snackbarContent: null,
      cityFetched: false,
      sending: false,
      timezone: null,
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
      fetchTimezone () {
        this.sending = true
        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.form.timezone = `--${this.form.city}--`
          this.cityFetched = true
          this.sending = false
        }, 1500)
      },
      submitForm () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          // Get timezone if city specified
          this.fetchTimezone()
        } else {
          // Show snackbar with error text
          this.snackbarContent = 'Please select city!'
          this.showSnackbar = true;
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
  .md-card-content {
    padding-bottom: 0;
  }
  .md-disabled,
  input[disabled="disabled"] {
    opacity: .5;
  }
  .timezone-item {
    .md-disabled {
      opacity: 1;
    }
    input {
      // opacity: .5;
    }
    .md-field {
      &:after {
        display: none;
      }
      margin-bottom: 0;
    }
  }
</style>
<!-- Global form styles -->
<style lang="scss">
  .md-select-menu {
    background-color: #fff;
  }
</style>
<!--}}}-->
