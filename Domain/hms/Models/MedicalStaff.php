<?php

require_once __DIR__ . "/Person.php";
require_once __DIR__ . "/Room.php";
require_once __DIR__ . "/Prescription.php";
require_once __DIR__ . "/MedicalService.php";

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\TransactionRequiredException;

/**
 * @ORM\Entity
 */
class MedicalStaff extends Person
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;
    /**
     * @ORM\Column(length=30)
     */
    private $role;

    /**
     * @return mixed
     */
    public function getRole()
    {
        return $this->role;
    }

    /**
     * @param mixed $role
     */
    public function setRole($role): void
    {
        $this->role = $role;
    }
    /**
     * @ORM\Column(type="integer")
     */
    private $yearOfExperience;
    /**
     * @ORM\ManyToOne(targetEntity="Room", inversedBy="assignedStaff")
     * @ORM\JoinColumns({
     *      @ORM\JoinColumn(name="assignRoomNo", referencedColumnName="number"),
     *      @ORM\JoinColumn(name="assignRoomType", referencedColumnName="type"),
     * })
     */
    private $assignedRoom;
    /**
     * @ORM\Column(length=30)
     */
    private $specialty;
    /**
     * @ORM\OneToMany(targetEntity="Prescription", mappedBy="prescribedBy")
     */
    private $prescriptions;

    public function __construct()
    {
        $this->prescriptions = new ArrayCollection();
    }

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of yearOfExperience
     */
    public function getYearOfExperience()
    {
        return $this->yearOfExperience;
    }

    /**
     * Set the value of yearOfExperience
     *
     * @return  self
     */
    public function setYearOfExperience($yearOfExperience)
    {
        $this->yearOfExperience = $yearOfExperience;

        return $this;
    }

    /**
     * Get })
     */
    public function getAssignedRoom()
    {
        return $this->assignedRoom;
    }

    /**
     * Set })
     *
     * @param array $assignedRoomIDs
     * @return  self
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function setAssignedRoom(array $assignedRoomIDs)
    {
        $assignedRoomObj = $this->entityManager->find('Room', $assignedRoomIDs);
        $this->assignedRoom = $assignedRoomObj;

        return $this;
    }

    /**
     * Get the value of prescriptions
     */
    public function getPrescriptions()
    {
        return $this->prescriptions;
    }

    /**
     * Set the value of prescriptions
     *
     * @param array $prescriptionIDs
     * @return  self
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function setPrescriptions(array $prescriptionIDs)
    {
        foreach ($prescriptionIDs as $prescriptionID) {
            $prescriptionObj = $this->entityManager->find('Prescription', $prescriptionID);
            $this->locations[] = $prescriptionObj;
        }
        return $this;
    }

    /**
     * Get the value of specialty
     */
    public function getSpecialty()
    {
        return $this->specialty;
    }

    /**
     * Set the value of specialty
     *
     * @return  self
     */
    public function setSpecialty($specialty)
    {
        $this->specialty = $specialty;

        return $this;
    }

    public function get() {
        $person = parent::get();
        $staff = [
            "id" => $this->getId(),
            "role" => $this->getRole(),
            "specialty" => $this->getSpecialty(),
            "yearOfExperience" => $this->getYearOfExperience(),
            "assignedRoomNo" => $this->getAssignedRoom()->getNumber(),
            "assignedRoomType" => $this->getAssignedRoom()->getType()
        ];
        return array_merge($staff, $person);
    }

    public static function validate(array $fields): bool
    {
        if (count($fields) === 10
            && array_key_exists("ssn", $fields)
            && array_key_exists("name", $fields)
            && array_key_exists("gender", $fields)
            && array_key_exists("dob", $fields)
            && array_key_exists("phone", $fields)
            && array_key_exists("role", $fields)
            && array_key_exists("yearOfExperience", $fields)
            && array_key_exists("specialty", $fields)
            && array_key_exists("assignedRoom", $fields)
            && array_key_exists("prescriptions", $fields)
            && $fields["ssn"] !== ""
            && $fields["name"] !== ""
            && $fields["gender"] !== ""
            && $fields["dob"] !== ""
            && $fields["age"] !== ""
            && $fields["phone"] !== ""
            && $fields["role"] !== ""
            && $fields["yearOfExperience"] !== ""
            && $fields["specialty"] !== ""
        ) {
            return true;
        }
        return false;
    }
}