import AdminJS, { ResourceWithOptions } from "adminjs";
import { LocationEntity } from "../../../database/entities/location.entity";
import activateLocation from "../handlers/activate.location";
import validationCreateLocation from "../validations/location/location-create.validation";
import validationEditLocation from "../validations/location/location-edit.validation";
import hasAdminPermission from "../permissions/has-admin.permission";
import listLocation from "../handlers/list.location";
import showLocation from "../handlers/show.location";

const LocationResource: ResourceWithOptions = {
    resource: LocationEntity,
    options: {
        properties: {
            deletedAt: {
                isVisible: false
            },
            creatorId: {
                isVisible: {
                    edit: false,
                    show: true,
                    list: true
                }
            }
        },
        navigation: {
            icon: "Location",
            name: null
        },
        actions: {
            activateLocation: {
                isAccessible: hasAdminPermission,
                icon: 'Activate',
                actionType: 'record',
                handler: activateLocation,
                component: AdminJS.bundle('../components/activated-locations')
            },
            new: {
                isAccessible: hasAdminPermission,
                before: validationCreateLocation,
            },
            edit: {
                isAccessible: hasAdminPermission,
                before: validationEditLocation
            },
            delete: {
                isAccessible: hasAdminPermission
            },
            bulkDelete: { isAccessible: hasAdminPermission },
            search: { isAccessible: hasAdminPermission },
            list: {
                isAccessible: hasAdminPermission,
                after: listLocation
            },
            show: {
                isAccessible: hasAdminPermission,
                after: showLocation
            }
        }
    }
};

export default LocationResource;