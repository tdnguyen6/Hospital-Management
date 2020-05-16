<?php

require_once __DIR__ . "/Person.php";
require_once __DIR__ . "/Visit.php";
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
class Patient extends Person
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;
    /**
     * @ORM\OneToMany(targetEntity="Visit", mappedBy="byPatient")
     */
    private $visits;
    /**
     * @ORM\Column(type="integer")
     */
    private $noOfVisits;

    public function __construct()
    {
        $this->visits = new ArrayCollection();
    }

    /**
     * Get the value of noOfVisits
     */
    public function getNoOfVisits()
    {
        return $this->noOfVisits;
    }

    /**
     * Set the value of noOfVisits
     *
     * @return  self
     */
    public function setNoOfVisits($noOfVisits)
    {
        $this->noOfVisits = $noOfVisits;

        return $this;
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
     * Get the value of visits
     */
    public function getVisits()
    {
        return $this->visits;
    }

    /**
     * Set the value of visits
     *
     * @param array $visitIDs
     * @return  self
     * @throws TransactionRequiredException
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function setVisits(array $visitIDs)
    {
        foreach ($visitIDs as $visitID) {
            $visitObj = $this->entityManager->find('Visit', $visitID);
            $this->visits[] = $visitObj;
        }
        $this->noOfVisits = count($this->visits);

        return $this;
    }

    public function get() {
        $person = parent::get();
        $patient = [
            "id" => $this->getId(),
            "noOfVisits" => $this->getNoOfVisits()
        ];
        return array_merge($patient, $person);
    }

    public static function validate(array $fields): bool
    {
        if (count($fields) === 6
            && array_key_exists("ssn", $fields)
            && array_key_exists("name", $fields)
            && array_key_exists("gender", $fields)
            && array_key_exists("dob", $fields)
            && array_key_exists("phone", $fields)
            && array_key_exists("visits", $fields)
            && $fields["ssn"] !== ""
            && $fields["name"] !== ""
            && $fields["gender"] !== ""
            && $fields["dob"] !== ""
            && $fields["age"] !== ""
            && $fields["phone"] !== ""
        ) {
            return true;
        }
        return false;
    }


}