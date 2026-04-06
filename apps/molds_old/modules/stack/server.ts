import 'server-only';
import {StackServerApp} from '@stackframe/stack';

const ROOT = 'dashboard';
const HANDLER = 'auth';

export const stackServerApp = new StackServerApp({
  tokenStore: 'nextjs-cookie',
  urls: {
    handler: `/${HANDLER}`,
    home: `/${ROOT}`,
    signIn: `/${HANDLER}/sign-in`,
    afterSignIn: `/${ROOT}`,
    signUp: `/${HANDLER}/sign-up`,
    afterSignUp: `/${ROOT}`,
    signOut: `/${HANDLER}/sign-out`,
    afterSignOut: `/${HANDLER}/sign-in`,
    emailVerification: `/${HANDLER}/email-verification`,
    passwordReset: `/${HANDLER}/reset-password`,
    forgotPassword: `/${HANDLER}/forgot-password`,
    accountSettings: `/${HANDLER}/account-settings`,
  },
  noAutomaticPrefetch: true,
});
