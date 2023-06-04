module.exports = {
    hasPermission: function (perm, user) {
        if (!user) return false;
        for (const index in user.permissions) {
            if (user.permissions[index].codename == perm) {
                return true;
            }
        }

        return false;
    },
    isSuperUserOrhasPermission: function (perm, user) {
        //check if user is_superuser
        if (!user) return false;
        if (user.is_active !== 1) return false;
        if (user.status_auth !== 'active') return false;
        if (user.is_superuser && Number(user.is_superuser) == 1) {
            return true;
        }

        for (const index in user.permissions) {
            if (user.permissions[index].codename === perm) {
                return true;
            }
        }

        // services and plans
        for (const sub of user.subscriptions) {
            const now = new Date().getTime();
            if (sub.status === 'active' && +sub.expiresAt > now && sub.serviceId) {
                if (sub.serviceId.accesses.includes(perm)) {
                    console.log('now')
                    return true;
                }
            }
        }

        return false;
    },
    is_authenticate: function (user) {
        if (user) {
            return true;
        } //endif

        return false;
    },
    subscriptionsToPermissions: function (user) {
        let codenames = [];
        for (const sub of user.subscriptions) {
            const now = new Date().getTime();
            if (sub.status === 'active' && new Date(sub.expiresAt).getTime() > now && sub.serviceId && sub.serviceId.accesses) {
                codenames = [...codenames, ...sub.serviceId.accesses.split(',')]
            }
        }
        return codenames;
    }
};
