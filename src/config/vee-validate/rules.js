// ===============================================================================================
// ===============================================================================================
// strategy #1
//                              Vee-Validate & @vee-validate/rules
//  if you need few rules, and want to declare them in more readable way, it's the best approach
// ===============================================================================================
// ===============================================================================================
import { defineRule } from "vee-validate"; // npm install vee-validate --save
import { required, email, min } from "@vee-validate/rules"; // npm install @vee-validate/rules

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "Passwords must match";
});

// ===============================================================================================
// ===============================================================================================
//  strategy #2
//                      Or you can also globally define all the available rules
//                              in the @vee-validate/rules package:
// ===============================================================================================
// ===============================================================================================
//
//        import { defineRule } from 'vee-validate';
//        import AllRules from '@vee-validate/rules';
//
//        Object.keys(AllRules).forEach(rule => {
//            defineRule(rule, AllRules[rule]);
//        });
//
//
//
// ===============================================================================================
// ===============================================================================================
//   strategy #3
//                                You can also declare your custom rules:
//                      [!] note: name of the rule should be in snake_case format
// ===============================================================================================
// ===============================================================================================
//
//
//      defineRule('required', value => {
//          if (!value || !value.length) {
//              return 'This field is required';
//          }
//          return true;
//      });
//
defineRule("tel_num", (value) => {
  if (!value) {
    return true;
  }

  const regex = /^[+0-9][0-9 ]+$/;

  return regex.test(value);
});
//
// ===============================================================================================
// ===============================================================================================
